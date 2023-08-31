/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './MatchIcon.styles';

type Props = {
    variant?: "bestMatch" | "closeMatch";
    isVisible?: boolean;
}

export const MatchIcon = ({variant, isVisible = false}: Props) => {
    return (
        <S.MatchIcon variant={variant ? variant : "bestMatch"} isvisible={isVisible ? 1 : 0}>
            {variant === "bestMatch" && "Best match"}
            {variant === "closeMatch" && "Close match"}
        </S.MatchIcon>
    )
}