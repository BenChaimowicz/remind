import express from 'express';

export interface Controller {
    path: string;
    router: any;
}