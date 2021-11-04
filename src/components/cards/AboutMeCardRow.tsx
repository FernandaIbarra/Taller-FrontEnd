import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { MediumText } from "../../styles/TextStyles";

interface AboutMeCardRowProps {
  title: string;
  value: string | number;
  href?: string;
}

const AboutMeCardRow = (props: AboutMeCardRowProps) => {

    const formatDate = (value: string | number) => {
      if(typeof value === "number") {
        let date = new Date(value);
        return date.toLocaleDateString();
      } else {
        return value;
      }
  }
  const formatLink = () => {
    if(props.href) {
    let element= props.href? <a href={props.href} target={props.href}>{props.value}</a>
                  : <p></p>;
      return element
    } 

}

  return (
    <InfoDetailBox>
      <InfoKey>{props.title}</InfoKey>
      <InfoValueWrapper>
        {props.href && props.value &&(
          <InfoValue>{
          formatLink()
          }</InfoValue> 
        )}
        {!props.href && (
          <InfoValue>{
          formatDate(props.value)
          }</InfoValue>      
        )}

      </InfoValueWrapper>
    </InfoDetailBox>
  );
};

const InfoDetailBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 6px;
`;

const InfoValueWrapper = styled.div`
    
`;

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
  
`;

const InfoValue = styled(MediumText)`
  color: ${themes.light.text1};
  margin-bottom: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

export default AboutMeCardRow
;
