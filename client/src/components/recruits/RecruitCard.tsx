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
import Toast from '../common/modal/Toast';
import { useState } from 'react';

export default function RecruitCard({ recruit }: { recruit: Recruit }) {
  const [isCopy, setIsCopy] = useState(false);
  const { description, title, user, id, images, startDate, endDate } = recruit;

  const onClickShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/recruit-detail/${recruit.id}`);
    setIsCopy(true);
  };

  return (
    <Card className="recruit-card" sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={images?.[0]} alt="Paella dish" loading="lazy" />

      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{getUserName(user)}</Avatar>}
        title={title}
        subheader={`${startDate} ~ ${endDate}`}
      />

      <CardContent>
        <Typography className="recruit-card-description" variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions className="recruit-card-actions">
        <IconButton onClick={onClickShare}>
          <ShareIcon />
        </IconButton>

        <Link to={`/recruit-detail/${id}`}>
          <Button>자세히보기</Button>
        </Link>
      </CardActions>
      {isCopy && <Toast message={`${title}지원 링크가 복사되었습니다.`} onClose={() => setIsCopy(false)} />}
    </Card>
  );
}
