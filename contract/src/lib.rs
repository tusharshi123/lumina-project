// Stellar Smart Contract for Lumina Donations (Soroban)
// This contract manages grant fundraising campaigns

use soroban_sdk::{contract, contractimpl, Env, Symbol, symbol_short, Address, String as SorobanString, Vec as SorobanVec};
use soroban_sdk::token::TokenClient;

pub struct DonationContract;

#[derive(Clone)]
pub struct Grant {
    pub id: u32,
    pub title: SorobanString,
    pub goal: i128,
    pub raised: i128,
    pub owner: Address,
}

#[contract]
pub impl DonationContract {
    pub fn initialize(env: Env, token: Address) {
        env.storage().persistent().set(&symbol_short!("token"), &token);
        env.storage().persistent().set(&symbol_short!("grants"), &SorobanVec::<Grant>::new(&env));
    }

    pub fn create_grant(env: Env, title: SorobanString, goal: i128, owner: Address) -> u32 {
        let mut grants: SorobanVec<Grant> = env.storage().persistent().get(&symbol_short!("grants")).unwrap_or(SorobanVec::new(&env));
        let id = grants.len() as u32;
        
        grants.push_back(Grant {
            id,
            title,
            goal,
            raised: 0,
            owner,
        });
        
        env.storage().persistent().set(&symbol_short!("grants"), &grants);
        id
    }

    pub fn donate(env: Env, grant_id: u32, amount: i128, donor: Address) -> bool {
        let token_address: Address = env.storage().persistent().get(&symbol_short!("token")).unwrap();
        let token_client = TokenClient::new(&env, &token_address);
        
        // Transfer tokens from donor to contract
        token_client.transfer(&donor, &env.current_contract_address(), &amount);
        
        // Update grant raised amount
        let mut grants: SorobanVec<Grant> = env.storage().persistent().get(&symbol_short!("grants")).unwrap();
        if (grant_id as usize) < grants.len() {
            let mut grant = grants.get_unchecked(grant_id as usize);
            grant.raised += amount;
            grants.set(grant_id as usize, grant);
            env.storage().persistent().set(&symbol_short!("grants"), &grants);
            
            true
        } else {
            false
        }
    }

    pub fn get_grant(env: Env, grant_id: u32) -> Option<Grant> {
        let grants: SorobanVec<Grant> = env.storage().persistent().get(&symbol_short!("grants")).unwrap_or(SorobanVec::new(&env));
        if (grant_id as usize) < grants.len() {
            Some(grants.get_unchecked(grant_id as usize))
        } else {
            None
        }
    }

    pub fn get_all_grants(env: Env) -> SorobanVec<Grant> {
        env.storage().persistent().get(&symbol_short!("grants")).unwrap_or(SorobanVec::new(&env))
    }
}
