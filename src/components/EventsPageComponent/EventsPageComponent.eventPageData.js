module.exports = () => {
  return `
    ... on WordPress_Page_Components_EventContents_EventPageComponent {
      eventCategory
      eventDescription
      eventTitle
      fieldGroupName
      eventColumns {
        column1 {
          columnTitle
          columnIcon {
            sourceUrl
          }
        }
        column2 {
          columnTitle
          columnIcon {
            sourceUrl
          }
        }
        column3 {
          columnTitle
          columnIcon {
            sourceUrl
          }
        }
      }
      eventImage {
        sourceUrl
      }
    }
  `
}
