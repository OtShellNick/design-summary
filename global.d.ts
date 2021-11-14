declare module '@';
declare module '@/*';
declare module '@components';
declare module '@components/*';
declare module 'classnames';
declare module '*.woff';
declare module '*.woff2';

declare module "*.svg?tsx" {
    const content: any;
    export default content;
}