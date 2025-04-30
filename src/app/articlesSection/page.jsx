import './articlesSection.css';
import ArticleCard from './ArticleCard';
import article1 from '../../assets/images/article/1.jpg';
import article2 from '../../assets/images/article/2.jpg';
import article3 from '../../assets/images/article/3.jpg';
import article4 from '../../assets/images/article/4.jpg';

const articles = [
  {
    title: 'Articles about side effects',
    imageSrc: article1,
    link: '/articles',
  },
  {
    title: 'Recommended medications',
    imageSrc: article2,
    link: '/articles',
  },
  {
    title: 'General articles about Vaccination',
    imageSrc: article3,
    link: '/articles',
  },
  {
    title: 'Advice before and after vaccination',
    imageSrc: article4,
    link: '/articles',
  },
];

const ArticlesSection = () => {
  return (
    <div className="articlesSection">
      <div className="container">
        <section>
          <h2 className="pageHeader">Articles</h2>
          <div className="articles-grid">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                imageSrc={article.imageSrc}
                link={article.link}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticlesSection;
