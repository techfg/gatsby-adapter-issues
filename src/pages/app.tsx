import React from "react"

import { Router } from "@reach/router"
import { Link } from "gatsby"

type PageProps = { path: string; name: string }

const MenuLink = ({ to, label }: { to: string; label: string }) => (
  <Link style={{ marginRight: 20 }} to={to}>
    {label}
  </Link>
)
const Menu = () => (
  <nav>
    <MenuLink to="/app" label="App Home" />
    <MenuLink to="/app/profile" label="Profile" />
    <MenuLink to="/app/details" label="Details" />
  </nav>
)

const AppPage: React.FC<PageProps> = ({ path, name }) => (
  <>
    <h1 style={{ marginBottom: 20 }}>{name}</h1>
    <Menu />
  </>
)

const App = () => (
  <div>
    <Router>
      <AppPage path="/app/details" name="App Details" />
      <AppPage path="/app/profile" name="App Profile" />
      <AppPage path="/app/" name="App Home" />
    </Router>
  </div>
)

export default App
