import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [category, setCategory] = useState("sports");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadmore, setLoadmore] = useState(20);

  const newsApi = async () => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=133b9bb5feb749e88b62f041ab3a3959&category=${category}&pageSize=${loadmore}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
  }, [newsResults, category, loadmore]);

  console.log(newsArray);

  return (
    <div className="app">
      <NavInshorts setCategory={setCategory} />
      <NewsContent
        loadmore={loadmore}
        setLoadmore={setLoadmore}
        newsArray={newsArray}
        newsResults={newsResults}
      />
    </div>
  );
}

export default App;
