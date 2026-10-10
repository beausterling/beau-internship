import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
      setItems(data);
      setLoading(false);
    }

    fetchItems();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCardSkeleton />
            </div>
          ))
        : items.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}
      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(visibleItems + 4)}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
