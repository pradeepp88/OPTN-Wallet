import React, { useEffect } from "react";
import styled from "styled-components";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect, ConnectedProps } from "react-redux";

import { Spacer, T } from "../atoms";

import {
  hasMnemonicSelector,
  activeAccountIdSelector
} from "../data/accounts/selectors";
import { getAccount } from "../data/accounts/actions";
import { hasArtifactSelector } from "../data/artifacts/selectors";
import { getP2SHAddress } from "../data/artifacts/actions";
import { FullState } from "../data/store";

const ScreenWrapper = styled(SafeAreaView)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

type PropsFromParent = NavigationScreenProps & {};

// Redux connection
const mapStateToProps = (state: FullState) => ({
  accountAddress: activeAccountIdSelector(state),
  isCreated: hasMnemonicSelector(state),
  isP2SHAddressCreated: hasArtifactSelector(state)
});

const mapDispatchToProps = {
  getAccount,
  getP2SHAddress
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsFromParent;

const CreateWalletScreen = ({
  navigation,
  isCreated,
  getAccount,
  accountAddress,
  isP2SHAddressCreated,
  getP2SHAddress
}: Props) => {
  useEffect(() => {
    if (isCreated && isP2SHAddressCreated) {
      navigation.navigate("Home");
    } else if (!isCreated) {
      getAccount();
    } else {
      if (accountAddress) {
        getP2SHAddress(accountAddress);
      }
    }
  }, [isCreated, isP2SHAddressCreated]);

  return (
    <ScreenWrapper>
      <ActivityIndicator />
      <Spacer />
      <T monospace>Loading Wallet...</T>
    </ScreenWrapper>
  );
};

export default connector(CreateWalletScreen);
