import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import './Rubrique.css';

export const Rubrique = ({id, image, titre, description, onClick, actionPrimaire, actionSecondaire}) => {
    return (
        <Card id={id} className="Rubrique">
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={image}
                    title={titre}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {titre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {(actionPrimaire || actionSecondaire) && <CardActions>
                {actionPrimaire && <Button
                    size="small"
                    color="primary"
                    onClick={actionPrimaire.onClick}
                >
                    {actionPrimaire.titre}
                </Button>}
                {actionSecondaire && <Button
                    size="small"
                    color="primary"
                    onClick={actionSecondaire.onClick}
                >
                    {actionSecondaire.titre}
                </Button>}
            </CardActions>}
        </Card>
    );
}
