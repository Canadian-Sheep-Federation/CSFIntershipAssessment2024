import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import FormProps from "./Form";
export interface FormProps {
  title: string;
  image: string;
  rating: number;
  genre: string;
}

export default function AnimeCard(props: FormProps) {
  return (
    <Card sx={{ width: 250 }}>
      <div>
        <Typography level="title-lg">{props.title}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={props.image} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Rating</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {props.rating}
          </Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Typography level="body-xs">Genre</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {props.genre}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
