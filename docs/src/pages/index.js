import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
//import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// import LinkCard from '@site/src/components/LinkCard';
// import FlashyCard from '@site/src/components/FlashyCard';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const githubStarsUrl=`https://ghbtns.com/github-btn.html?user=${siteConfig.organizationName}&repo=${siteConfig.projectName}&type=star&count=true&size=large`;
 
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/guided-tour">
            Guided Tour
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src={githubStarsUrl}
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
        
      </div>
    </header>
  );
}

import {FeatureCardsRow} from '@site/src/components/FeatureCards';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline} >
      <HomepageHeader />
      <main>
      <FeatureCardsRow />
      </main>
    </Layout>
  );
}
