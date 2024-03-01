use crate::{auth::OAuth2Response, git::github::types::Github, utils::json::Json};
use self::types::Configuration;

pub mod types;

impl Configuration {

    pub fn new(github_token: Option<String>) -> Self {
        Configuration{
            github_token,
            user: Option::None,
            projects: vec![],
        }
    }

    pub fn register(oauth2_response: OAuth2Response) -> bool {
        if let Some(mut configuration) = Json::read::<Configuration>(".config/configuration.json".to_string()) {
            configuration.github_token = Some(oauth2_response.access_token);
            return Configuration::save(&configuration);
        }
        let mut configuration = Configuration::new(Some(oauth2_response.access_token.clone()));
        configuration.user = Github::me(configuration.github_token.to_owned().unwrap_or_default());
        Configuration::save(&configuration)
    }
    
    pub fn save(configuration: &Configuration) -> bool {
        let content = serde_json::to_string_pretty(&configuration).unwrap_or_default();
        Json::save(content, ".config".to_owned(), "configuration.json".to_owned())
    }
    
}
