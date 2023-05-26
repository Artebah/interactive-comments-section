import { Box, Button, Typography } from "@mui/material";

interface ReplyingToButtonProps {
  replyingTo: string;
}
const ReplyingToButton = ({ replyingTo }: ReplyingToButtonProps) => {
  return (
    <Button
      sx={{
        p: 0,
        pb: 0.2,
        textTransform: "lowercase",
        fontSize: "1rem",
        fontWeight: 700,
        mr: 0.5,
      }}>
      @{replyingTo}
    </Button>
  );
};

interface ContentBottomProps {
  content: string;
  replyingTo?: string;
}
export const ContentBottom = ({ content, replyingTo }: ContentBottomProps) => {
  return (
    <Box>
      <Typography
        sx={{
          color: "text.secondary",
          pr: 4,
        }}>
        {replyingTo && <ReplyingToButton replyingTo={replyingTo} />}
        {content}
      </Typography>
    </Box>
  );
};
