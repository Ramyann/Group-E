import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Fragment } from "react";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function Hint({ longText }) {
  return (
    <HtmlTooltip title={<Fragment>{longText}</Fragment>}>
      <InfoIcon />
    </HtmlTooltip>
  );
}

export default Hint;
