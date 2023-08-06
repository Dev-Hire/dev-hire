import { Recruit } from '@/types/recruit';
import { getUserName } from '@/utils/utils';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function RecruitCard({ recruit }: { recruit: Recruit }) {
  return (
    <Card className="recruit-card" sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={recruit.images?.[0]} alt="Paella dish" />

      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{getUserName(recruit.user)}</Avatar>}
        title={recruit.title}
        subheader={`${recruit.startDate} ~ ${recruit.endDate}`}
      />

      <CardContent>
        <Typography className="recruit-card-description" variant="body2" color="text.secondary">
          {recruit.description}
        </Typography>
      </CardContent>

      <CardActions className="recruit-card-actions">
        <IconButton>
          <ShareIcon />
        </IconButton>

        <Link to={`/recruit-detail/${recruit.id}`}>
          <Button>자세히보기</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
