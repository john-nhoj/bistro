import * as csstips from 'csstips'
import { color, px, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { classes, style } from 'typestyle'
import Layout from '../components/layout'
import * as Theme from '../theme'

interface Props {
  data: {
    packages: {
      formules: Array<{
        title: String
        price: Number
      }>
    }
    possibilities: {
      menuDishes: Array<{
        title: String
        dishes: Array<{
          name: String
          description: String
          spicy: Boolean
        }>
      }>
    }
  }
  pageContext: {
    pageName: String
    accompaniementMessage: String
  }
}

export default ({ data: { packages, possibilities }, pageContext }: Props) => (
  <Layout pageName={pageContext.pageName} withPadding>
    <div
      className={style(
        ...Theme.breakpoints({
          mobile: {
            padding: Theme.paddings.mobile,
          },
          desktop: {
            padding: Theme.paddings.desktop,
          },
        }),
        {
          ...csstips.flex,
          ...csstips.vertical,
          ...csstips.verticallySpaced(rem(1)),
          $nest: {
            '& > div:not(:first-child)': {
              paddingTop: rem(3),
            },
          },
        }
      )}
    >
      <div
        className={style({
          ...csstips.verticallySpaced(rem(1)),
        })}
      >
        {packages.formules.map(formule => (
          <div
            key={String(formule.title)}
            className={style({
              ...csstips.flex,
              ...csstips.horizontal,
            })}
          >
            <div
              className={style({
                ...csstips.flex,
                fontFamily: Theme.fonts.title,
              })}
            >
              {formule.title}
            </div>
            <div
              className={style({
                ...csstips.content,
                ...csstips.vertical,
                ...csstips.endJustified,
                fontFamily: Theme.fonts.title,
              })}
            >
              {formule.price}0 €
            </div>
          </div>
        ))}
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.horizontallySpaced(rem(1)),
          })}
        >
          <div
            className={style({
              ...csstips.content,
              ...csstips.vertical,
              ...csstips.centerCenter,
            })}
          >
            <i
              className={classes(
                'fas fa-star',
                style({
                  color: Theme.colors.gold.toString(),
                })
              )}
            ></i>
          </div>
          <div
            className={style({
              ...csstips.flex,
              ...csstips.horizontal,
              fontSize: Theme.fontSizes.textExtraSmall,
              fontStyle: 'italic',
            })}
          >
            {pageContext.accompaniementMessage}
          </div>
        </div>
      </div>

      {possibilities.menuDishes.map(category => (
        <div
          key={String(category.title)}
          className={style({
            ...csstips.centerCenter,
            ...csstips.vertical,
          })}
        >
          <div
            className={classes(
              Theme.styles.title,
              style({
                paddingBottom: rem(3),
                ...csstips.vertical,
                ...csstips.center,
                ...csstips.verticallySpaced(rem(1)),
                textAlign: 'center',
              })
            )}
          >
            <span>{category.title}</span>
            <span
              className={style({
                borderBottomStyle: 'solid',
                borderBottomWidth: px(1),
                borderBottomColor: Theme.colors.gold.toString(),
                width: rem(3),
              })}
            ></span>
          </div>
          {category.dishes.map((dish, index) => (
            <div
              key={String(dish.name)}
              className={style({
                ...csstips.vertical,
                ...csstips.verticallySpaced(rem(1)),
                textAlign: 'center',
                paddingTop: index > 0 ? rem(2) : rem(0),
              })}
            >
              <span
                className={style({
                  fontFamily: Theme.fonts.title,
                  fontSize: Theme.fontSizes.textMedium,
                  fontWeight: 400,
                })}
              >
                {dish.name}
                {dish.spicy ? (
                  <i
                    className={classes(
                      'fas fa-pepper-hot',
                      style({
                        paddingLeft: rem(1),
                        color: color('red')
                          .darken(0.1)
                          .toString(),
                      })
                    )}
                  ></i>
                ) : null}
              </span>
              {dish.description ? (
                <span
                  className={style({
                    fontSize: Theme.fontSizes.textExtraSmall,
                    fontStyle: 'italic',
                  })}
                >
                  ( {dish.description} )
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetLunchMenus($locale: String, $contentful_id: String) {
    packages: contentfulMenus(
      node_locale: { eq: $locale }
      contentful_id: { eq: $contentful_id }
    ) {
      formules {
        title
        price
      }
    }
    possibilities: contentfulMenus(
      node_locale: { eq: $locale }
      contentful_id: { eq: $contentful_id }
    ) {
      menuDishes {
        title
        dishes {
          name
          description
          spicy
        }
      }
    }
  }
`
