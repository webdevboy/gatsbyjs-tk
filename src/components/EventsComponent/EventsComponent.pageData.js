module.exports = () => {
  return `
    ... on WordPress_Page_Components_Contents_Event {
      eventDescription1
      eventDescription2
      eventName
      eventEndDate
      eventStartDate
      eventPageSlug
      fieldGroupName
      eventBackground {
        sourceUrl
      }
      eventBackgroundMedium {
        sourceUrl
      }
      eventBackgroundMobile {
        sourceUrl
      }
    }
  `
}
