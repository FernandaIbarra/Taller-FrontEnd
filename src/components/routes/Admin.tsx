import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";


const Admin = () => {
  let history = useHistory();
  let location = useLocation();
  const { t } = useTranslation();
  const { add } = useAuth();
  const { addNotification, removeLastNotification } = useApp();

  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let { from } = (location.state as any) || { from: { pathname: "/" } };


  async function addProject(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t("projectInput.err_usr_pass"));
      return;
    }

    try {
      addNotification(t("loader.text"));
      await add(tittle, description, tags, version);
      history.replace(from);
    } catch (e) {
      setErrorMsg(t("projectInput.err_inv_lgn"));
    } finally {
      removeLastNotification();
    }
  }

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeTittle(e: ChangeEvent<HTMLInputElement>) {
    setTittle(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTags(e: ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    onChangeAnyInput();
  }

  function onChangeVersion(e: ChangeEvent<HTMLInputElement>) {
    setVersion(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    return tittle !== "" && description !== "" && tags !== "" && version !== "";
  }

  function dismissError() {
    setErrorMsg("");
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("projectInput.projectPannel_title")}</TitleForm>
        <ProjectPannel onSubmit={addProject}>
          { errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          <ProjectForm name="tittle" type="text" placeholder={t("projectInput.tittle_placeholder")} value={tittle} onChange={onChangeTittle}/>
          <ProjectForm name="text" type="text" placeholder={t("projectInput.description_placeholder")} value={description} onChange={onChangeDescription}/>
          <ProjectForm name="text" type="text" placeholder={t("projectInput.tags_placeholder")} value={tags} onChange={onChangeTags}/>
          <ProjectForm name="text" type="text" placeholder={t("projectInput.version_placeholder")} value={version} onChange={onChangeVersion}/>
          <ButtonForm type="submit" value={t("projectInput.button_delte") != null ? t("projectInput.button_delete") as string : "Delete"}  />
          <ButtonForm type="submit" value={t("projectInput.button_post") != null ? t("projectInput.button_post") as string : "Post"}  />
        </ProjectPannel>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`

const ProjectPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
  }


`;

const ErrorDescription = styled(Caption)`

  color: ${themes.light.warning};


`;

const ProjectForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }

`;

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.light.primary};
  }
`;


export default Admin;