import React, { useEffect, useState } from "react";
import axios from "axios";
import useCollapse from "react-collapsed";

function Home() {
  const [cat, setCat] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const getCat = async () => {
    try {
      await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`).then((res) => {
        setCat(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setPage((s) => ({ page: s.page + 1 }));
      await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`).then((res) => {
        setCat([...cat, ...res.data]);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <div>
      <div className="fluid-container">
        <div class="row justify-content-around" style={{ margin: "15px" }}>
          {cat.length > 0 &&
            cat.map((c, i) => (
              <div className="card m-2 carditem" key={i} style={{ width: "18rem" }}>
                <img className="card-img-top" style={{ width: "286px", height: "250px" }} src={c.url} alt="" />
                <div className="card-body">
                  <h5 className="card-title" {...getCollapseProps()}>
                    {c.id}
                  </h5>
                  <button
                    className="btn btn-primary"
                    {...getToggleProps({
                      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                    })}
                  >
                    {isExpanded ? "Detail Collapse" : "Detail Expand"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => loadMore()}>
          load more
        </button>
      </div>
    </div>
  );
}

export default Home;
