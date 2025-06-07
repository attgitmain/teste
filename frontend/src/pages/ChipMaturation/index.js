import React from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import { Typography } from "@material-ui/core";
import { i18n } from "../../translate/i18n";

const ChipMaturation = () => {
  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("chipMaturation.title")}</Title>
      </MainHeader>
      <Typography>{i18n.t("chipMaturation.message")}</Typography>
    </MainContainer>
  );
};

export default ChipMaturation;
