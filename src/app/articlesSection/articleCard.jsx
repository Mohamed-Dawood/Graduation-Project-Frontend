import Link from 'next/link';
import Image from 'next/image';

const ArticleCard = ({ title, imageSrc, link }) => {
  return (
    <Link href={link} className="article-card">
      <div className="image-wrapper">
        <Image src={imageSrc} alt={title} fill />
      </div>
      <p>{title}</p>
    </Link>
  );
};

export default ArticleCard;
