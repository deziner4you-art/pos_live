import { SocialService } from './social.service';
export declare class SocialController {
    private readonly socialService;
    constructor(socialService: SocialService);
    getStatus(branchId: string): Promise<{} | null>;
    connectFacebook(branchId: string, res: any): Promise<any>;
    connectInstagram(branchId: string, res: any): Promise<any>;
    metaCallback(code: string, stateParam: string, res: any): Promise<any>;
    getFacebookPages(token: string): Promise<any>;
    selectFacebookPage(body: {
        branchId: string;
        pageId: string;
        pageName: string;
        token: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        branch_id: number;
        facebook_page_id: string | null;
        facebook_page_name: string | null;
        instagram_user_id: string | null;
        instagram_username: string | null;
        access_token: string | null;
        is_facebook_connected: boolean;
        is_instagram_connected: boolean;
    }>;
    disconnectFacebook(branchId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        branch_id: number;
        facebook_page_id: string | null;
        facebook_page_name: string | null;
        instagram_user_id: string | null;
        instagram_username: string | null;
        access_token: string | null;
        is_facebook_connected: boolean;
        is_instagram_connected: boolean;
    }>;
    getInstagramAccounts(token: string): Promise<{
        id: string;
        username: string;
    }[]>;
    selectInstagramAccount(body: {
        branchId: string;
        accountId: string;
        username: string;
        token: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        branch_id: number;
        facebook_page_id: string | null;
        facebook_page_name: string | null;
        instagram_user_id: string | null;
        instagram_username: string | null;
        access_token: string | null;
        is_facebook_connected: boolean;
        is_instagram_connected: boolean;
    }>;
    disconnectInstagram(branchId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        branch_id: number;
        facebook_page_id: string | null;
        facebook_page_name: string | null;
        instagram_user_id: string | null;
        instagram_username: string | null;
        access_token: string | null;
        is_facebook_connected: boolean;
        is_instagram_connected: boolean;
    }>;
}
