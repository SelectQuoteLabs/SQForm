import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Formik</>,
    imageUrl: 'img/undraw_forms.svg',
    description: (
      <>
        Formik is a form library that keeps track of values/errors/visited
        fields, orchestrates validation, and handles submission, so we don't
        have to.
      </>
    ),
  },
  {
    title: <>Yup</>,
    imageUrl: 'img/undraw_design_components.svg',
    description: (
      <>
        Yup is a JavaScript schema builder for validation. Define a schema, then
        validate the shape of an existing value.
      </>
    ),
  },
  {
    title: <>Material UI</>,
    imageUrl: 'img/material_ui.svg',
    description: (
      <>
        Material UI is a React UI library that provides a Grid system,
        Typography system, and form components to provide a consisten and
        beautiful UI for SQForm.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig?.title || ''}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig?.title || ''}</h1>
          <p className="hero__subtitle">{siteConfig?.tagline || ''}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <h2 style={{ textAlign: 'center' }}>Powered By</h2>
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
