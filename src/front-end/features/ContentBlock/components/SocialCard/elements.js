import styled, { css } from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';
import disIMG from 'assets/social/discord.svg';
import vkIMG from 'assets/social/vk.svg';

export const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  box-sizing: border-box;
`;

const Layer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  transition: top 125ms ease-in-out;
`;

export const DefaultLayer = styled(Layer)`
  top: 0;
`;

export const HoverLayer = styled(Layer)`
  top: -100%;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Roboto Slab', serif;
`;

const Block = styled.div`
  display: flex;
  overflow: hidden;
  width: 50%;
  box-sizing: border-box;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 5px ${getColor(COLORS.BLACK, 85)};
  position: relative;
  top: 0;
  left: 0;
  user-select: none;
  cursor: pointer;

  &:hover {
    ${DefaultLayer} {
      top: 100%;
    }

    ${HoverLayer} {
      top: 0;
    }
  }
`;

export const Discord = styled(Block)`
  margin-right: 8px;

  ${props => props.loading && css`
    background-color: #6c71b4;
    pointer-events: none;
  `}

  ${DefaultLayer} {
    background-color: #6c71b4;
  }

  ${HoverLayer} {
    background-color: #6c71b4;
    color: ${getColor(COLORS.WHITE, 100)};
  }
`;

export const VK = styled(Block)`
  margin-left: 8px;

  ${props => props.loading && css`
    background-color: #254e79;
    pointer-events: none;
  `}

  ${DefaultLayer} {
    background-color: #254e79;
  }

  ${HoverLayer} {
    background-color: #254e79;
    color: ${getColor(COLORS.WHITE, 100)};
  }
`;

export const DiscordImage = styled.div`
  width: 36px;
  height: 36px;
  background-image: url(${disIMG});
  background-size: cover;
`;

export const VKImage = styled.div`
  width: 36px;
  height: 36px;
  background-image: url(${vkIMG});
  background-size: cover;
`;