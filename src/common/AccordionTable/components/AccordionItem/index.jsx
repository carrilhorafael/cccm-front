import React, { useState } from "react";
import MainMenu from "../../../mainMenu";
import { Body, Header, HeaderContainer, Item } from "../../styles";

export function AccordionItem ({resource, CardHeader, CardBody, getMenuConfigs, hasMenu}) {
  const [opened, setOpened] = useState(false)

  const getTotalHeight = () => {
    let height = 216

    if (resource.ministeries.length !== 0) {
      height = height + 52
    }

    if (!!resource.notes) {
      height = height + 52
    }

    if (resource.has_access) {
      height = height + 12
    }

    return height
  }

  return (
    <Item>
      <Header>
        <HeaderContainer onClick={() => setOpened(!opened)}>
          <CardHeader resource={resource}/>
        </HeaderContainer>
        {hasMenu && <MainMenu menuConfigs={getMenuConfigs(resource)}/>}
      </Header>
      <Body opened={opened} height={getTotalHeight()}>
        <CardBody resource={resource}/>
      </Body>
    </Item>
  )
}
