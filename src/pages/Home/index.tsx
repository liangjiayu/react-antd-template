import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import { useModel, request } from 'umi';

const Home: React.FC = () => {
  const { count, addCount, reduceCount } = useModel('count');

  return (
    <PageContainer title="首页">
      <Card>
        <div>
          <Button
            onClick={() => {
              request('/api/post/test', {
                method: 'POST',
                data: {
                  flag: 'biz_error', // http_error  biz_error  success
                },
              }).then(
                (res) => {
                  console.log(res);
                },
                (error) => {
                  console.dir(error);
                },
              );
            }}
          >
            post
          </Button>
        </div>
        <div>
          <span>models {count} </span>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              addCount();
            }}
          >
            add
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              reduceCount();
            }}
          >
            reduce
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Home;
