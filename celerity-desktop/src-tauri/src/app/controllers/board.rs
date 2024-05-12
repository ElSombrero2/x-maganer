use celerity_core::{
    config::types::Configuration,
    services::todo::TodoService
};

#[tauri::command]
pub fn add_task(config: Configuration, id: String, row: String, title: String){
    let _ = TodoService::add(&config, id, row, title);
}