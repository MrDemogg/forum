import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import DescriptionCard from "./DescriptionCard";
import Comments from "./Comments";

const Description = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const [postData, setPostData] = useState<{username: string, datetime: string, description: string, title: string}>()
  useEffect(() => {
    setPostData(JSON.parse(searchParams.get('info') as string))
  }, [])
  return (
    <>
      {postData
        &&  <div style={{marginTop: 55}}>
              <DescriptionCard title={postData.title} username={postData.username} datetime={postData.datetime} text={postData.description} />
              <Comments postId={params.id as string} />
            </div>
      }
    </>
  );
};

export default Description;