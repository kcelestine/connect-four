terraform {
  cloud {
    organization = "_cloudcte"

    workspaces {
      name = "first-one"
    }
  }
}
