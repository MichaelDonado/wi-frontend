import React from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'

const Footer = () => (
  <Segment
    vertical
    as="footer"
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h4" content="Contactame" />
            <List>
              <List.Item
                icon="linkedin"
                style={{ display: 'flex' }}
                content={<a href="http://linkedin.com/in/michael-donado-casallas-23a863174">LinkedIn</a>}
              />
            </List>
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as="h4" content="Proyectos" />
            <List>
              <List.Item
                icon="github"
                style={{ display: 'flex' }}
                content={
                  <a href="http://github.com/MichaelDonado">
                    GitHub
                  </a>
                }
              />
            </List>
          </Grid.Column>

          <Grid.Column width={7}>
            <Header as="h4">Hecho por</Header>
            <p>
              Michael Donado
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Footer
