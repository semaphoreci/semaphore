import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
//import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// import LinkCard from '@site/src/components/LinkCard';
import FlashyCard from '@site/src/components/FlashyCard';

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

import {PlaygroundCardsRow} from '@site/src/components/Playground';

// Original content inside main: <HomepageFeatures />
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline} >
      <HomepageHeader />
      <main>
      <PlaygroundCardsRow />
      </main>
    </Layout>
  );
}



/*

      <FlashyCard
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        title="Custom Title"
        description="This is a custom description for the flashy card."
        linkText="Custom Link"
        linkUrl="https://example.com"
      />
      */
