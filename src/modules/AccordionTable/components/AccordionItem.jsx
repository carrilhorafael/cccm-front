import React, { useState } from "react";
import MainMenu from "atomics/MainMenu";
import { Body, Header, HeaderContainer, Item } from "../styles";

export default function AccordionItem ({
    resource,
    CardHeader,
    CardBody,
    getMenuConfigs,
    getBodyHeight,
    hasMenu
  }) {
  const [opened, setOpened] = useState(false)

  return (
    <Item>
      <Header>
        <HeaderContainer onClick={() => setOpened(!opened)}>
          <CardHeader resource={resource}/>
        </HeaderContainer>
        {hasMenu && <MainMenu menuConfigs={getMenuConfigs(resource)}/>}
      </Header>
      <Body opened={opened} height={getBodyHeight(resource)}>
        <CardBody resource={resource}/>
      </Body>
    </Item>
  )
}
