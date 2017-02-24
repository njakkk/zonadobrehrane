# Define the Configuration
docpadConfig = {

  documentsPaths: [  # default
    'errors'
    'documents']

  templateData:
    site:
      url: "http://www.zonadobrehrane.com"

  environments:
    development:
      hostname: 'localhost'
      templateData:
        site:
          url: "http://localhost:9778"
    production:
      templateData:
        site:
          url: "http://www.zonadobrehrane.com"
    staging:
      templateData:
        site:
          url: "http://dev.ameba.rs/zdh"

  events:
    serverExtend: (opts) ->
      # Extract the server from the options
      {server} = opts
      docpad = @docpad

      # Include our custom routes
      require(__dirname + '/routes.coffee')({docpad, server})

}

# Export the Configuration
module.exports = docpadConfig