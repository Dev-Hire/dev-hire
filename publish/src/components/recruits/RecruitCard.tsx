import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Recruit } from '@/types/recruit';

export default function RecruitCard({ recruit }: { recruit: Recruit }) {
  return (
    <Card className="recruit-card" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={recruit.images?.[0]}
        alt="Paella dish"
      />

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            유저
          </Avatar>
        }
        title={recruit.title}
        subheader={`${recruit.startDate} ~ ${recruit.endDate}`}
      />

      <CardContent>
        <Typography
          className="recruit-content"
          variant="body2"
          color="text.secondary"
        >
          {recruit.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
