import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function OutputCard({ shortenedUrl }: { shortenedUrl: string }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "#95A3B3",
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              Your Shortened URL
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "#0077CC",
                m: 1,
                wordWrap: "break-word",
              }}
            >
              {shortenedUrl}
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2,
                bgcolor: "#84DCC6",
                color: "#FFFFFF",
              }}
              onClick={() => navigator.clipboard.writeText(shortenedUrl)}
            >
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
