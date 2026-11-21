'use client';
import {useEffect} from 'react';
import type {Locale} from '@/lib/content';
export default function HtmlLang({locale}:{locale:Locale}){useEffect(()=>{document.documentElement.lang=locale==='ua'?'uk':locale},[locale]);return null}
