import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import More from '@material-ui/icons/More';
import { withRouter } from "react-router";
import { GetActiveRecipe } from '../../../Store/Actions';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '0 1rem 1rem 0',

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    marginLeft: 'auto'
  }
}));

const SingleCard = (props) => {
  const classes = useStyles();
  const { title, id, rating, price, description, image, date ,brand} = props.recipe;
  //console.log(id)
  const dispatch = useDispatch()

  function moreHandler(d) {
    props.history.push(`/recipeinfo/${d}`)
    dispatch(GetActiveRecipe(d))
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {(title)?title.substr(0, 1).toUpperCase():''}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={brand}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={rating}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {(description)?description.slice(0,160):''}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography component="h6" variant="h6">
      ${price}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>

        <Button
          onClick={() => moreHandler(id)}
          color="secondary"
          className={classes.button}
          startIcon={<More />}
        >
          More
        </Button>

      </CardActions>
      <Button></Button>
    </Card>
  );
}
export default withRouter(SingleCard)