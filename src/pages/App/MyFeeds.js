import React, { useEffect, useContext, useState } from "react";

//imported infinite scrool
import InfiniteScroll from "react-infinite-scroll-component";

//MyProfile component
import MyProfile from "../../components/MyProfile";
//FeedCard component
import FeedCard from "../../components/FeedCard";

import { AppContext } from "../../context/applicationContext";
import LoadingIndicator from "../../components/LoadingIndicator";

//import the getMyFeedsApi from ApiUtl.js 
import { getMyFeedsApi } from "../../util/ApiUtil";

const MyFeeds = () => {

  //child component access this using useContext hook
  const appContext = useContext(AppContext);
  //access the token from the cookies using appContext object
  const token = appContext.getSession();
  //access the userData by using appContext
  const userData = appContext.getUserData();

  //this array is going to consists of all the feeds that is posted by the user
  const [feedsData, setFeedsData] = useState([]);
  //initial page to 0, first page
  const [pageNumber, setPageNumber] = useState(0);
  //boolean value - to check more feeds to be displayed 
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "My Feeds | Feed App";
    //displays only the first page when the page is loaded 
    getMyFeeds(0);
  }, []);

  const getMyFeeds = async (loadPageNumber) => {
    if (loadPageNumber === 0) {
      setFeedsData([]);
    }

    const apiResponse = await getMyFeedsApi(token, loadPageNumber);
    if (apiResponse.status === 1) {
      let feedsDataNew = [];
      if (loadPageNumber !== 0) {
        feedsDataNew = feedsData;
      }
      feedsDataNew.push(...apiResponse.payLoad.content);
      setFeedsData(feedsDataNew);

      setPageNumber(loadPageNumber + 1);

      if (loadPageNumber === apiResponse.payLoad.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  if (!userData) {
    return <LoadingIndicator />;
  }


  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-0 md:mx-12 w-2xl container px-2 mx-auto">
      {/* {#MyProfile Component} */}
      <MyProfile />
      <article>
        {/* {#FeedCard Component} */}
        <InfiniteScroll
          dataLength={feedsData.length}
          next={() => getMyFeeds(pageNumber)}
          hasMore={hasMore}
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all.</b>
            </p>
          }
          refreshFunction={() => getMyFeeds(0)}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 className="text-center">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center">&#8593; Release to refresh</h3>
          }
        >
          <div className="mt-3">
            {feedsData.map(
              ({ feedId, picture, content, createdOn, feedMetaData, user }) => (
                <FeedCard
                  key={feedId}
                  feedId={feedId}
                  picture={picture}
                  content={content}
                  createdOn={createdOn}
                  username={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  profilePicture={user.profile.picture}
                  feedMetaData={feedMetaData}
                />
              )
            )}
          </div>
        </InfiniteScroll>
      </article>
    </main>
  )
}

export default MyFeeds
