import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { BadgeAvatar } from "./Badge";
import { useMainContext } from "../context/main";

interface ContentCardType {
  backgroundArtworkSrc: string;
  profileImgSrc: string;
  title: string;
  description: string;
  artworkAlt: string;
  descriptionLength?: number;
  firstBatch?: boolean;
  slug?: string;
}

export const ContentCard: React.FC<ContentCardType> = ({
  backgroundArtworkSrc,
  artworkAlt,
  profileImgSrc,
  title,
  description,
  descriptionLength = 400,
  firstBatch = false,
  slug = "",
}) => {
  const { toggleLoading } = useMainContext();

  return (
    <Card sx={{ minHeight: 300 }}>
      <div onClick={() => toggleLoading(true)}>
        <Link href="/podcast/[id]" as={`/podcast/${slug}`}>
          <Box>
            <CardMedia
              component="img"
              alt={artworkAlt}
              height="140"
              image={backgroundArtworkSrc || "/poddy.png"}
              sx={{ filter: "grayscale(100%)", opacity: 0.4 }}
            />
            <CardContent sx={{ pb: 0 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
                sx={{ position: "relative" }}
              >
                {title.toLocaleLowerCase()}
                <Box sx={{ position: "absolute", bottom: "100%" }}>
                  <BadgeAvatar src={profileImgSrc} height={100} width={100} />
                </Box>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 500 }}
              >
                {description.length > descriptionLength
                  ? description.slice(0, descriptionLength) + "..."
                  : description}
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: firstBatch ? 2 : 0 }}>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Box>
        </Link>
      </div>
    </Card>
  );
};
