import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grow } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMainContext } from "../context/main";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  comments?: number;
  imgSrc: string;
  imgAlt?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  date,
  comments = 0,
  imgSrc,
  imgAlt = "political dystopia blog artwork",
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const { toggleLoading } = useMainContext();
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <div onClick={() => toggleLoading(true)}>
      <Link href="/blog/[id]" as={`/blog/${slug}`}>
        <Grow in>
          <Card>
            <CardMedia
              component="img"
              height="194"
              image={imgSrc}
              alt={imgAlt}
            />
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
              subheader={new Date(date).toString().slice(0, 16).trim()}
            />
          </Card>
        </Grow>
      </Link>
    </div>
  );
};
