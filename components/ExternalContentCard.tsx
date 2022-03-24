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
import { BadgeAvatar } from "./Badge";
// import { useMainContext } from "../context/main";
// import { fireEvent } from "../utils/ga";

interface ContentCardProps {
  backgroundArtworkSrc: string;
  profileImgSrc: string;
  title: string;
  description: string;
  artworkAlt: string;
  descriptionLength?: number;
  firstBatch?: boolean;
  slug?: string;
  extendedStay?: boolean;
}

export const ExternalContentCard: React.FC<ContentCardProps> = ({
  backgroundArtworkSrc,
  artworkAlt,
  profileImgSrc,
  title,
  description,
  descriptionLength = 400,
  slug = "",
}) => {
  return (
    <Card sx={{ minHeight: 300 }}>
      <Link href={slug}>
        <a target="_blank">
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
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Box>
        </a>
      </Link>
    </Card>
  );
};
