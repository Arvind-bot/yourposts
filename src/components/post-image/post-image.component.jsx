import React from "react";
import "./post-image.styles.scss";

export const PostImage = ({ imageUrl }) => <div className="post-image-box-style"><img  className="post-image-style" src={imageUrl} alt="post image" /></div>;