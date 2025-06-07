import React from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import { Typography } from "@material-ui/core";
import { i18n } from "../../translate/i18n";

const Leads = () => {
  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("leads.title")}</Title>
      </MainHeader>
      <Typography>{i18n.t("leads.message")}</Typography>
    </MainContainer>
  );
};

export default Leads;
