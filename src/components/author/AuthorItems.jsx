import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ nftCollection, authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection &&
            nftCollection.map((nft) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.id}
              >
                <NftCard item={{ ...nft, authorImage, authorId }} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
