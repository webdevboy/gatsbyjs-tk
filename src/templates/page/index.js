import React, { useEffect, useState, useRef } from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PageLayouts from "src/components/PageLayouts"
import { Swipeable } from "react-swipeable"
import * as cx from "classnames"

import { PageHero } from "src/components"
import useWindow from "src/hooks/useWindow"

import { heroAnimationDuration } from "src/utils/styleVars"

const FrontPage = ({ pageContext, heroData }) => {
  const { title, components } = pageContext
  const _window = useWindow() || {}
  const containerRef = useRef(null)
  const [showHero, setShowHero] = useState(true)
  const [containerIsScrollable, setContainerIsScrollable] = useState(false)

  const layouts = components.contents || []

  useEffect(() => {
    document.querySelector("html").classList.add("no-scrolling")
    document.querySelector("body").classList.add("is-front-page")

    document.body.style.transform = showHero
      ? `translateY(0)`
      : `translateY(-${_window.outerHeight})`

    return () => {
      document.querySelector("html").classList.remove("no-scrolling")
      document.querySelector("body").classList.remove("is-front-page")
      document.body.style.transform = "translateY(0)"
    }
  }, [])

  useEffect(() => {
    document.body.style.transform = showHero
      ? `translateY(0px)`
      : `translateY(-${_window.outerHeight}px)`

    if (!showHero) {
      setTimeout(() => setContainerIsScrollable(true), heroAnimationDuration)
    } else {
      setContainerIsScrollable(false)
    }
  }, [showHero])

  const handleWheelEvent = event => {
    if (
      event.deltaY < 0 &&
      containerRef.current &&
      containerRef.current.scrollTop <= 0
    ) {
      setShowHero(true)
    }
  }

  return (
    <>
      <PageHero data={heroData[0]} hideHero={() => setShowHero(false)} />
      <Swipeable
        className="swipe-container"
        onSwipedDown={() => {
          if (containerRef.current && containerRef.current.scrollTop <= 0) {
            setShowHero(true)
          }
        }}
      >
        <div
          className={cx("swipe-wrapper", {
            "overflow-scroll": containerIsScrollable,
          })}
          ref={containerRef}
          onWheel={handleWheelEvent}
          style={{ height: _window.outerHeight }}
        >
          <Layout
            theme={pageContext.themeSelect.themeSelect}
            isFrontPage={true}
            heroIsVisible={showHero}
            isFrontPage={pageContext.isFrontPage}
          >
            <SEO title={title || "Untitled"} />
            {layouts.map((layout, index) => (
              <PageLayouts key={index} layoutData={layout} />
            ))}
          </Layout>
        </div>
      </Swipeable>
    </>
  )
}

const Page = ({ pageContext }) => {
  const { title, components } = pageContext

  const layouts = components.contents || []

  const heroData = pageContext.components.contents.filter(
    o => o.fieldGroupName === "page_Components_Contents_HomepageHero"
  )

  return (
    <>
      {pageContext.isFrontPage && heroData.length ? (
        <FrontPage pageContext={pageContext} heroData={heroData} />
      ) : (
        <Layout theme={pageContext.themeSelect.themeSelect} isFrontPage={false}>
          <SEO title={title || "Untitled"} />
          {layouts.map((layout, index) => (
            <PageLayouts key={index} layoutData={layout} />
          ))}
        </Layout>
      )}
    </>
  )
}

export default Page
