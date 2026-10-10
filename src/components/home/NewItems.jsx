import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel className="owl-theme" key="skeleton" {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="180px" height="30px" />
                    <div className="nft__item_price">
                      <Skeleton width="100px" height="20px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="30px" height="15px" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" key="items" {...options}>
              {items.map((item) => (
                <NftCard item={item} key={item.id} />
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
