import React, { Children } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import DismissButton, {
  DismissableProps,
} from "../../Atoms/UI/Buttons/DismissButton";

import Text, { TextAlignmentWithinContainer } from "../../Atoms/UI/Text/Text";
import LineItem from "../../Widgets/LineItem/LineItem";

import { Box, Pressable, PressableProps } from "../../Atoms/utility";

import { Theme } from "../../theme";
import { BackgroundColorProps } from "@shopify/restyle";

interface CardProps extends PressableProps, DismissableProps {
  accessibilityLabel: string;
  border?: boolean;
  shadow?: boolean;
  title?: string;
  headerLeft: React.ReactNode;
  children?: any;
  titleAlignment?: TextAlignmentWithinContainer;
  borderBelowHeader?: boolean;
}

type Props = CardProps & BackgroundColorProps<Theme>;

function Card({
  accessibilityLabel,
  title,
  headerLeft,
  children,
  titleAlignment,
  dismissComponent,
  onDismiss,
  borderBelowHeader,
  ...rest
}: Props) {
  return (
    <Swipeable
      renderRightActions={onDismiss ? () => <Box flex={1} /> : undefined}
      onSwipeableRightOpen={onDismiss}
      onSwipeableLeftOpen={onDismiss}
    >
      <Pressable
        marginVertical="s"
        paddingHorizontal="m"
        paddingVertical="s"
        radius="l"
        justifyContent="center"
        accessibilityLabel={accessibilityLabel}
        borderColor="mediumGrey"
        borderWidth={0.5}
        backgroundColor="white"
        {...rest}
      >
        <LineItem
          type="simpleRow"
          accessibilityLabel="card-header"
          rightComponent={
            onDismiss ? (
              <DismissButton
                dismissComponent={dismissComponent}
                onDismiss={onDismiss}
              />
            ) : undefined
          }
          leftComponent={headerLeft}
          childrenAlignment={titleAlignment}
          bottomBorder={borderBelowHeader}
          bottomPadding={borderBelowHeader ? "s" : undefined}
        >
          <LineItem.Subheading>{title}</LineItem.Subheading>
        </LineItem>
        <Box paddingVertical="micro">
          {Children.map(children, (child) => {
            return (
              <Box marginTop="xs" marginBottom="micro">
                {child}
              </Box>
            );
          })}
        </Box>
      </Pressable>
    </Swipeable>
  );
}

type DescriptionProps = {
  heading: string;
  sameLine?: boolean;
  bodyText: string;
};

const Description = ({
  heading,
  sameLine = false,
  bodyText,
}: DescriptionProps) => {
  if (sameLine) {
    return (
      <Text accessibilityLabel="card-description">
        <Text accessibilityLabel="heading" size="l" weight="bold">
          {heading}&nbsp;
        </Text>
        {bodyText}
      </Text>
    );
  }
  return (
    <>
      <Text accessibilityLabel="heading" size="l" weight="bold">
        {heading}
      </Text>
      <Text accessibilityLabel="card-description" paddingTop="micro">
        {bodyText}
      </Text>
    </>
  );
};

Card.Description = Description;

export default Card;
