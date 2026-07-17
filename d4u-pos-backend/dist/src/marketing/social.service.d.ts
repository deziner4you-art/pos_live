import { PrismaService } from '../prisma/prisma.service';
export declare class SocialService {
    private prisma;
    constructor(prisma: PrismaService);
    getFacebookPages(accessToken: string): Promise<any>;
    saveFacebookPage(branchId: number, pageId: string, pageName: string, accessToken: string): Promise<{
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
    disconnectFacebook(branchId: number): Promise<{
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
    getInstagramAccounts(accessToken: string): Promise<{
        id: string;
        username: string;
    }[]>;
    saveInstagramAccount(branchId: number, igAccountId: string, igUsername: string, accessToken: string): Promise<{
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
    disconnectInstagram(branchId: number): Promise<{
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
    getSocialStatus(branchId: number): Promise<{
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
    } | null>;
}
